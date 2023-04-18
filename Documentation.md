# Documents List

# How to run application on local environmental ?

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

### About Application

Document List is progressive web application which can be run on different operation systems.
To install locally application click on download icon in web browser.
Application consists of two views : main (./) and recycle bin (./recycle-bin).

Main View.
Main View always contains two buttons: Recycle Bin and + by which it is added to list new document.
Recycle Bin.
List of removed documents with possibility to Restore and delete all files from list.

Documents object contain property isActive which decides if document is Document List or in Recycled Bin.

# Action on documents

File Store.js contain:
getDatabase() - function create a database documentsDB.
getDocumentsStore() - function create object store 'documents' where documents information are stored.

Methods:

- saveDocument() - create a new document from DB.
- deleteDocuments - delete a document from DB.

  Move to recycled bin action is done by changing isActive property for false.
  Restore from Recycled Bin is done by isActive property for true.
