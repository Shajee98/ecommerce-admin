import {Dispatch, SetStateAction, useEffect, useState} from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import Button from "./Button";

interface Props {
  category?: { _id: string,
    name: string,
    parent: any,
    properties: {name: string, values: string[]}[]}
  showModal: boolean,
  toggleModal: () => void,
  setEditedCategory: Dispatch<SetStateAction<category | undefined>>;
}

type categories = {
    _id: string,
   name: string,
   parent: any,
   properties: []
  }[]

type propertiesType = {
  [key: string]: any;
};

type category = {
    _id: string,
   name: string,
   parent: any,
   properties: {name: string, values: string[]}[]
}

export default function CategoryForm(props: Props) {
    const [editedCategory, setEditedCategory] = useState<category | undefined>(props.category);
    const [name,setName] = useState(props.category?.name || '');
    const [parentCategory,setParentCategory] = useState(props.category?.parent._id || '');
    const [properties,setProperties] = useState<{name: string, values: string}[]>([{name: "", values: ""}]);
    const [categories,setCategories] = useState<categories>([{_id: '0',name: 'mobile',parent: {},properties: []}]);

  useEffect(() => {
    // axios.get('/api/categories').then(result => {
    //   setCategories(result.data);
    // })
  }, []);

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
}

  const saveCategory = async (e: any) => {
    e.preventDefault();
    const data = {
      _id: editedCategory?._id,
      name,
      parentCategory,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(undefined);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'',values:''}];
    });
  }
  function handlePropertyNameChange(index: number,property: {name: string, values: string},newName: string) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;          
    });
  }
  function handlePropertyValuesChange(index: number,property: {name: string, values: string},newValues: string) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove: number) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  const toggleModal = () => {
    props.setEditedCategory(undefined)
    props.toggleModal()
  }

  return (
    <Modal size={'lg'} isOpen={props.showModal} onClose={toggleModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={'center'}>{editedCategory
      ? `Edit category ${editedCategory.name}`
      : 'Create new category'}</ModalHeader>
          <ModalCloseButton alignSelf={'flex-end'}/>
          <ModalBody>
  <form>
    <div className="flex gap-1">
      <input
        type="text"
        placeholder={'Category name'}
        onChange={ev => setName(ev.target.value)}
        value={name}/>
      <select
              onChange={ev => setParentCategory(ev.target.value)}
              value={parentCategory}>
        <option value="">No parent category</option>
        {categories.length > 0 && categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-2">
      <label className="block">Properties</label>
      <Button
        onClick={addProperty}
        text="Add new property"
        className="btn-default text-sm mb-2" />
      {properties.length > 0 && properties?.map((property,index) => (
        <div key={property.name} className="flex gap-1 mb-2 py-1">
          <input type="text"
                 value={property.name}
                 className="mb-0"
                 onChange={ev => handlePropertyNameChange(index,property,ev.target.value)}
                 placeholder="property name (example: color)"/>
          <input type="text"
                 className="mb-0"
                 onChange={ev =>
                   handlePropertyValuesChange(
                     index,
                     property,ev.target.value
                   )}
                 value={property.values}
                 placeholder="values, comma separated"/>
          <Button
            onClick={() => removeProperty(index)}
            type="button"
            text="Remove"
            className="btn-red" />
        </div>
      ))}
    </div>
    {/* <div className="flex gap-1">
      {editedCategory && (
        <button
          type="button"
          onClick={() => {
            setEditedCategory(null);
            setName('');
            setParentCategory('');
            setProperties([]);
          }}
          className="btn-default">Cancel</button>
      )}
      <Button 
      type="submit"
      className="btn-primary py-2 rounded-full" text="Save" onClick={saveCategory}/>
    </div> */}
  </form>
          </ModalBody>

          <ModalFooter gap={5}>
            <Button text="Close" onClick={toggleModal} className="btn-default"/>
            <Button text="Submit" onClick={saveCategory} className="btn-primary"/>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

