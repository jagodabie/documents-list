import { reactive } from "vue";

export const store = reactive({
  database: null,
  documents: null,
  activeDocuments: null,
  recycledBinDocuments: null,

  async getDatabase() {
    return new Promise((resolve, reject) => {
      if (this.database) {
        resolve(this.database);
      }

      let request = window.indexedDB.open("documentsDB", 1);
      request.onerror = (event) => {
        console.error("Unable to open documents database", event);
        reject("Error");
      };

      request.onsuccess = (event) => {
        this.database = event.target.result;
        resolve(this.database);
      };

      request.onupgradeneeded = (event) => {
        let database = event.target.result;
        database.createObjectStore("documents", {
          autoIncrement: true,
          keyPath: "id",
        });
      };
    });
  },

  async getDocumentsStore() {
    this.database = await this.getDatabase();

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction("documents", "readonly");
      const DBstore = transaction.objectStore("documents");

      let documentList = [];

      DBstore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          documentList.push(cursor.value);
          cursor.continue();
        }
      };

      transaction.oncomplete = () => {
        resolve(documentList);
      };

      transaction.onerror = (event) => {
        reject(event);
      };
    });
  },

  async setDocumentList() {
    this.documents = await this.getDocumentsStore();
  },

  async getActiveDocumentList() {
    return this.documents.filter((element) => element.isActive === true);
  },

  async setActiveDocuments() {
    if (!this.documents) await this.setDocumentList();

    this.activeDocuments = await this.getActiveDocumentList();
  },

  async getRecycledBinDocuments() {
    return this.documents.filter((element) => element.isActive == false);
  },

  async setRecycledBinDocumentsList() {
    if (!this.documents) await this.setDocumentList();

    this.recycledBinDocuments = await this.getRecycledBinDocuments();
  },

  async saveDocument(document) {
    this.database = await this.getDatabase();

    return new Promise((reject, resolve) => {
      const transaction = this.database.transaction("documents", "readwrite");
      const store = transaction.objectStore("documents");

      store.put(document);

      transaction.oncomplete(() => {
        resolve("Item successfully saved");
      });

      transaction.onerror((event) => {
        reject(event);
      });
    });
  },

  async changeDocumentsLocalization(document) {
    this.activeDocuments = this.activeDocuments.filter(
      (item) => item.id !== document.id
    );

    store.saveDocument({ ...document, isActive: !document.isActive });

    await this.setDocumentList();
    await this.setRecycledBinDocumentsList();
    await this.setActiveDocuments();
  },

  async addDocument() {
    store.saveDocument({ name: "Document", date: new Date(), isActive: true });

    await this.setDocumentList();
    await store.setActiveDocuments();
  },
  async deleteDocumentsFromRecycledBin(id) {
    this.database = await this.getDatabase();

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction("documents", "readwrite");
      const store = transaction.objectStore("documents");

      store.delete(id);

      transaction.oncomplete = () => {
        resolve("Item successfully deleted.");
      };

      transaction.onerror = (event) => {
        reject(event);
      };
    });
  },
  async deleteDocuments(document) {
    this.database = await this.getDatabase();

    return new Promise((resolve, reject) => {
      const transaction = this.database.transaction("documents", "readwrite");
      const store = transaction.objectStore("documents");

      store.delete(document);

      transaction.oncomplete(() => {
        resolve("Item successfully saved");
      });

      transaction.onerror((event) => {
        reject(event);
      });
    });
  },
  async deleteAllDocuments() {
    this.recycledBinDocuments.forEach((element) =>
      this.deleteDocumentsFromRecycledBin(element.id)
    );

    await this.setDocumentList();
    await this.setRecycledBinDocumentsList();
  },
});
