import React from 'react'
import { Card, CardContent, CardTitle } from '../ui/card';

export default function CustomToolTip({active, payload, label}: {
    active?: any
    payload?: any
    label?: any
}) {


  if(active){
    console.log(payload[0].payload);
    return (
        <Card>
                <h5
                className='relative top-[50%] p-2'
                >
                    {new Date(label).toLocaleDateString([], {
                        day : 'numeric', 
                        month: 'short', 
                    })} - {payload[0].payload.value} Kg
                </h5>
        </Card>
      )
  }else {
    return null
  }
}
