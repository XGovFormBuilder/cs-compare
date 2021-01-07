import { ListActions } from "../../../reducers/listActions";
import { hasValidationErrors, validateTitle } from "../../../validations";
import { clone } from "@xgovformbuilder/model";
import { ListItemHook } from "./index";

export function useGlobalListItem(state, dispatch): ListItemHook {
  const { selectedItem = {} } = state;
  const { value = "", condition } = selectedItem;

  function handleTitleChange(e) {
    dispatch({
      type: ListActions.EDIT_LIST_ITEM_TEXT,
      payload: e.target.value,
    });
  }

  function handleConditionChange(e) {
    dispatch({
      type: ListActions.EDIT_LIST_ITEM_CONDITION,
      payload: e.target.value,
    });
  }

  function handleValueChange(e) {
    dispatch({
      type: ListActions.EDIT_LIST_ITEM_VALUE,
      payload: e.target.value,
    });
  }

  function handleHintChange(e) {
    dispatch({
      type: ListActions.EDIT_LIST_ITEM_DESCRIPTION,
      payload: e.target.value,
    });
  }

  function validate(i18n) {
    const title = state.selectedItem.text || "";
    const errors = validateTitle("title", title, i18n);
    const valErrors = hasValidationErrors(errors);
    if (valErrors) {
      dispatch({
        type: ListActions.LIST_ITEM_VALIDATION_ERRORS,
        payload: errors,
      });
    }
    return valErrors;
  }

  function prepareForSubmit(data) {
    const copy = clone(data);
    const { selectedList, selectedItemIndex, initialName } = state;
    let { items } = selectedList;
    if (!selectedItem.isNew) {
      items = items.splice(selectedItemIndex, 1, selectedItem);
    } else {
      const { isNew, errors, ...selectedItem } = state.selectedItem;
      items.push(selectedItem);
    }

    const indexOfList = copy.lists.findIndex(
      (list) => list.name === initialName
    );

    if (selectedList.isNew) {
      delete selectedList.isNew;
      copy.addList(selectedList);
    }

    const list = copy.lists[indexOfList];
    copy.lists[indexOfList] = { ...list, items };

    return copy;
  }

  function prepareForDelete(data, index) {
    const copy = clone(data);
    const { initialName, selectedList, selectedItemIndex } = state;
    selectedList.items.splice(selectedItemIndex ?? index, 1);
    const selectedListIndex = copy.lists.findIndex(
      (list) => list.name === initialName
    );
    copy.lists[selectedListIndex] = selectedList;
    return copy;
  }

  return {
    handleTitleChange,
    handleConditionChange,
    handleValueChange,
    handleHintChange,
    prepareForSubmit,
    prepareForDelete,
    validate,
    value,
    condition,
    title: selectedItem.text || "",
    hint: selectedItem.description || "",
    isStaticList: false,
  };
}