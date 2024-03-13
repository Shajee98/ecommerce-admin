import Button from "../components/Button";
import Layout from "../components/Layout";
import SelectInput from "../components/inputs/SelectInput";
import TextInput from "../components/inputs/TextInput";

const Settings = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1>Settings</h1>
        <div className="flex flex-col gap-2">
        <SelectInput
          label="Featured Product"
          name="featuredproduct"
        />
        <TextInput
          label="Shipping Cost (USD)"
          name="shippingcost"
          type="number"
          placeholder="Set shipping price"
        />
        </div>
        <Button text='Save Changes' className='btn-primary mt-3 w-max'/>
      </div>
    </Layout>
  );
};

export default Settings;
