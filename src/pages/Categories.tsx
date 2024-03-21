import Layout from "../components/Layout";
import {createRef, useEffect, useRef, useState} from "react";
import axios from "axios";
import Button from "../components/Button";
import CategoryForm from "../components/CategoryForm";
import DeleteModal from "../components/DeleteModal";

type category = {
  _id: string,
 name: string,
 totalPets: number
}

interface FocusableElement {
  focus(options?: {preventScroll?: boolean;}): void;
}

export default function Categories() { 
  // const MySwal = withReactContent(Swal)
  const [editedCategory, setEditedCategory] = useState<category | undefined>(undefined);
  // const [name,setName] = useState('');
  const [show,setShow] = useState(false);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  // const [parentCategory,setParentCategory] = useState('');
  const [categories,setCategories] = useState<category[]>([{_id: '0',name: 'dog', totalPets: 7}]);
  // const [properties,setProperties] = useState<{name: string, values: string}[]>([]);
  const cancelRef = useRef<FocusableElement>(null)

  // useEffect(() => {
  //   fetchCategories();
  // }, [])
  const editCategory = (category: category) => {
    setEditedCategory(category);
    // setName(category.name);
    // setParentCategory(category.parent?._id);
    // setProperties(
    //   category.properties.map(({name,values}) => ({
    //   name,
    //   values:values.join(',')
    // }))
    // );
    toggleCategoryModal()
  }

  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
}

  function deleteCategory(category: category){
  }

  const toggleCategoryModal = () => {
    setShow(!show)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  return (
    <Layout>
      {show ? <CategoryForm category={editedCategory} setEditedCategory={setEditedCategory} toggleModal={toggleCategoryModal} showModal={show}/> : null}
      {showDeleteModal ? <DeleteModal cancelRef={cancelRef} isOpen={showDeleteModal} onClose={toggleDeleteModal}/> : null}
      <div className="w-full flex justify-between items-center">
      <h1>Categories</h1>
      <Button className="btn-primary bg-gradient-to-r from-[#314755] to-[#26a0da] font-bold" onClick={toggleCategoryModal} text="+" />
      </div>
        <table className="basic mt-2">
          <thead>
          <tr>
            <th>Name</th>
            <th>Total Pets</th>
            <td></td>
          </tr>
          </thead>
          <tbody>
          {categories.length > 0 && categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.totalPets}</td>
              <td>
                <button
                  onClick={() => editCategory(category)}
                  className="btn-default mr-1"
                >
                  Edit
                </button>
                <button
                  onClick={toggleDeleteModal}
                  className="btn-red">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
    </Layout>
  );
}

// export default withSwal((swal: any, ref: any) => <Categories swal={swal}/>);
