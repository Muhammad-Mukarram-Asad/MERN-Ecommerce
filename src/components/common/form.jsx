import React from 'react'
import { Label } from '../ui/label'
import {Input} from '../ui/input'

const ComponentForm = ({formControls}) => {
  return (
    <form className='flex flex-col gap-3'>
        {
            formControls.map((control, index) => {
                return (
                    <div key={index} className="grid w-full gap-1.5">
                        <Label htmlFor={control.name} className="mb-1">{control.label}</Label>
                        <Input
                            type={control.type}
                            name={control.name}
                            placeholder={control.placeholder}
                            id={control.name}
                            required
                        />
                    </div>
                )
            })

        }
       
    </form>
  )
}

export default ComponentForm