const SelectInput = (props: { label: string, name: string}) => {
    return (
      <div className='flex flex-col gap-1 text-left w-3/4'>
        <label htmlFor={props.name}>{props.label}</label>
        <select value={'Select Product'} className="w-full px-4" {...props} >
            <option value="Headphones">Headphones</option>
        </select>
      </div>
    );
  };

export default SelectInput