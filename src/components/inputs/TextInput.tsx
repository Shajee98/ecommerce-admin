const FormInput = (props: { label: string, name: string, type: string, placeholder: string}) => {
    return (
      <div className='flex flex-col gap-1 text-left w-3/4'>
        <label htmlFor={props.name}>{props.label}</label>
        <input className="w-full" {...props} />
      </div>
    );
  };

export default FormInput