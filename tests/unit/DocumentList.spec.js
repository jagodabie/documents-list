import { shallowMount } from "@vue/test-utils";

import DocumentList from "@/components/DocumentList.vue";

describe("DocumentList.vue", () => {
  it("Given props :isRecycledBin equal true and empty documentsList empty array it shows documents list header in Recycle Bin", () => {
    const isRecycledBin = true;
    const documentsList = [];
    const wrapper = shallowMount(DocumentList, {
      props: { isRecycledBin, documentsList },
    });
    expect(wrapper.find('[data-test="list-header"]').text()).toBe(
      "Recycled Bin"
    );
    expect(wrapper.find('[data-test="empty-list"]').text()).toBe(
      "List is empty"
    );
  });
  it("Given props :isRecycledBin equal false and empty array documentsList props  it shows documents list header in Recycle Bin", () => {
    const isRecycledBin = false;
    const documentsList = [];
    const wrapper = shallowMount(DocumentList, {
      props: { isRecycledBin, documentsList },
    });
    expect(wrapper.find('[data-test="list-header"]').text()).toBe("Documents");
    expect(wrapper.find('[data-test="empty-list"]').text()).toBe(
      "List is empty"
    );
  });
  it("Given array of documents and recycledBin props equal true it displays Documents List in Recycle Bin", () => {
    const isRecycledBin = true;

    const wrapper = shallowMount(DocumentList, {
      props: {
        isRecycledBin,
        documentsList: [
          { id: 274, isActive: false, name: "Document1", date: new Date() },
          { id: 275, isActive: false, name: "Document2", date: new Date() },
          { id: 276, isActive: false, name: "Document3", date: new Date() },
        ],
      },
    });
    expect(wrapper.findAll('[data-test="list-item"]').length).toBe(3);
    expect(wrapper.findAll("button.remove").length).toBe(3);
  });
  it("Given array of documents and recycledBin props equal true it displays Documents List in Recycle Bin", () => {
    const isRecycledBin = true;

    const wrapper = shallowMount(DocumentList, {
      props: {
        isRecycledBin,
        documentsList: [
          { id: 274, isActive: false, name: "Document1", date: new Date() },
          { id: 275, isActive: false, name: "Document2", date: new Date() },
          { id: 276, isActive: false, name: "Document3", date: new Date() },
        ],
      },
    });
    expect(wrapper.findAll('[data-test="list-item"]').length).toBe(3);
    expect(wrapper.findAll("button.remove").length).toBe(3);
  });
});
