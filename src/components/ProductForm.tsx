import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "./Spinner";
import {ReactSortable} from "react-sortablejs";
import { useNavigate } from "react-router-dom";
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

interface ItemType {
  id: number;
  name: string;
}

interface Props {
  product?: {_id: string,
  title:string,
  description:string,
  price:string,
  images:ItemType[],
  category:Category,
  properties:{},}
  showModal: boolean,
  toggleProductModal: () => void
}

type propertiesType = {
  [key: string]: any;
};

type Category = {
  _id: string,
 name: string,
 parent: any,
 properties: {name: string, values: string[]}[]
}

export default function ProductForm(props: Props) {
  const [title,setTitle] = useState(props.product?.title || '');
  const [description,setDescription] = useState(props.product?.description || '');
  const [category,setCategory] = useState<string | undefined>(props.product?.category._id);
  const [productProperties,setProductProperties] = useState<propertiesType>(props.product?.properties || {});
  const [price,setPrice] = useState(props.product?.price || '');
  const [images,setImages] = useState<ItemType[]>(props.product?.images || []);
  const [goToProducts,setGoToProducts] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const [categories,setCategories] = useState<Category[] | []>([{_id: '0',name: 'mobile',parent: {},properties: [{name: 'color', values: ['black', 'blue']}]}]);
  const router = useNavigate();
  useEffect(() => {
    console.log("props.product ==> ", props.product)
    // axios.get('/api/categories').then(result => {
    //   setCategories(result.data);
    // })
  }, []);
  async function saveProduct(e: any) {
    e.preventDefault();
    const data = {
      title,description,price,images,category,
      properties:productProperties
    };
    if (props.product?._id) {
      //update
      await axios.put('/api/products', {...data,_id: props.product?._id});
    } else {
      //create
      await axios.post('/api/products', data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router('/products');
  }
  async function uploadImages(e: any) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
      const res = await axios.post('/api/upload', data);
      setImages((oldImages: any) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  function updateImagesOrder(images: ItemType[]) {
    setImages(images);
  }
  function setProductProp(propName: string,value: any) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill: any[] = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({_id}) => _id === category);
    if (catInfo)
    {
      propertiesToFill.push(...catInfo?.properties);
    }
    while(catInfo?.parent?._id) {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
    if (parentCat)
    {
      propertiesToFill.push(...parentCat.properties);
    }
      catInfo = parentCat;
    }
  }

  return (
    <Modal size={'lg'} isOpen={props.showModal} onClose={props.toggleProductModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf={'center'}>{props.product != undefined ? `EDIT ${props.product.title.toUpperCase()}` : 'ADD PRODUCT'}</ModalHeader>
          <ModalCloseButton alignSelf={'flex-end'}/>
          <ModalBody>
      <form>
        <label>Product name</label>
        <input
          type="text"
          placeholder="product name"
          value={title}
          onChange={ev => setTitle(ev.target.value)}/>
        <label>Category</label>
        <select value={category}
                onChange={ev => setCategory(ev.target.value)}>
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories?.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
            <div>
              <select value={productProperties[p.name]}
                      onChange={ev =>
                        setProductProp(p.name,ev.target.value)
                      }
              >
                {p.values.map((v: any) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-1">
          <ReactSortable
            list={images}
            className="flex flex-wrap gap-1"
            setList={updateImagesOrder}>
            {!!images?.length && images.map(link => (
              <div key={link.id} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
                <img src={link.name} alt="" className="rounded-lg"/>
              </div>
            ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <div>
              Add image
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={ev => setDescription(ev.target.value)}
        />
        <label>Price (in USD)</label>
        <input
          type="number" placeholder="price"
          value={price}
          onChange={ev => setPrice(ev.target.value)}
        />
      </form>
          </ModalBody>

          <ModalFooter gap={5}>
            <Button text="Close" onClick={props.toggleProductModal} className="btn-default"/>
            <Button text="Submit" onClick={saveProduct} className="btn-primary"/>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}

