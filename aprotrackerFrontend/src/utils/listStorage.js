import AsyncStorage from '@react-native-community/async-storage';


class ListStorage {
  constructor(namespace = 'defaultList') {
    this.namespace = namespace;
  }

  async getList() {
    const listItems = await AsyncStorage.getItem(`${this.namespace}:items`);

    return listItems ? JSON.parse(listItems) : [];
  }

  async addItem(item) {
    const currentListItems = await this.getList();
    const newListItems = [...currentListItems, item];

    await AsyncStorage.setItem(
      `${this.namespace}:items`,
      JSON.stringify(newListItems)
    );
  }

  async clearListItems() {
    await AsyncStorage.removeItem(`${this.namespace}:items`);
  }

  async deleteItem(itemName) {
    const currentListItems = await this.getList();

    const newListItems = currentListItems.filter(item => {
      return item.name !== itemName;
    });

    await AsyncStorage.setItem(
      `${this.namespace}:items`,
      JSON.stringify(newListItems)
    );
  }

}

export default ListStorage;