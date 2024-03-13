import { useField } from "formik";

const FormInput = (props: { label: string, name: string, type: string, placeholder: string}) => {
    const [field, meta] = useField(props);
    return (
      <div className='flex flex-col gap-1 text-left w-3/4'>
        <label htmlFor={props.name}>{props.label}</label>
        <input className="w-full" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-900 text-xs">{meta.error}</div>
        ) : <div className="h-4"></div>}
      </div>
    );
  };

export default FormInput