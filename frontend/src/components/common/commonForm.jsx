import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';



const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {

  function renderInputBasedOnComponent(getControlItems) {
    let element = null;
    const value = formData[getControlItems.name] || ""; 
    switch (getControlItems.componentType) {
    // for "input" 
      case "input":
        element = (
        <Input 
          value={value} 
          onChange={(e) => setFormData({
            ...formData,
            [getControlItems.name] : e.target.value
          })} 
          name={getControlItems.name} 
          placeholder={getControlItems.placeholder} 
          id={getControlItems.name} 
          type={getControlItems.type} 
          />
        )
        break;
  
      // for "select"  
      case "select":
        element = (
          <Select onValueChange={(value) => setFormData({
            ...formData,
            [getControlItems.name]: value
          })}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={getControlItems.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItems.options && getControlItems.options.length > 0 ? getControlItems.options.map((optionItems) => <SelectItem key={optionItems.id} value={optionItems.id}>{optionItems.label}</SelectItem>) : null}
            </SelectContent>
          </Select>
        )
        break;
      
      // for "textarea"  
      case "textarea":
        element = (
          <Textarea 
          value={value} 
          onChange={(e) => setFormData({
            ...formData,
            [getControlItems.name] : e.target.value
          })} 
          name={getControlItems.name} 
          placeholder={getControlItems.placeholder} 
          id={getControlItems.name}  />
        )
        break;
  
      default:
        element = (
        <Input 
        value={value} 
        onChange={(e) => setFormData({
          ...formData,
          [getControlItems.name] : e.target.value
        })} 
        name={getControlItems.name} 
        placeholder={getControlItems.placeholder} 
        id={getControlItems.name} 
        type={getControlItems.type} 
        />
      )
        break;
    }

    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-3'>
        {
          formControls.map((controlItems) => (
            <div key={controlItems.name} className='grid gap-1.5'>
              <Label className="mb-1">{controlItems.label}</Label>
              {
                renderInputBasedOnComponent(controlItems)
              }
            </div>
          ))
        }
      </div>
      <Button type="submit" className="mt-2 w-full bg-black text-white">{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default CommonForm
