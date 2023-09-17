import { useState,useEffect } from 'react'
import './App.css'

type ListData = {
  id : number
  content : string
}

const App = () => {

  const [listData,setlistData] = useState <ListData[] | null>(null)
  const [newContent,setNewContent] = useState <string> ("")

  //GET資料
  const fetchCatchUrl = async () => {
    await fetch("http://127.0.0.1:5000")
      .then(response => response.json())
      .then(data => {
        let key = Object.keys(data)
        let DataArray : ListData [] = []
        for(let i = 0 ; i < key.length ; i++){
          DataArray.push({
            id : i ,
            content : data[key[i]]
          })
        }
        setlistData(DataArray)
      })
      .catch(error => console.log(error))
  }

  //取得POST時的資料
    const addContentChangeHandle = (e:any) =>{
      setNewContent(e.target.value)
    }
  
  //POST新增資料

  const addsubmitNewContent = async () =>{
   const response =  await fetch ("http://127.0.0.1:5000",{
    method : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body : JSON.stringify({
      a : newContent
    })

   })

   if(response.status === 201){
    setNewContent("")
    await fetchCatchUrl()
    return
   }
    
  }
//修改資料
  const reviseSubmitContent = async (id : number , oldCentent : string) => {
    const response = await fetch ("http://127.0.0.1:5000",{
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
      aIndex : id,
      aNewValue : newContent
      })
    })
    if(response.status === 204){
      await fetchCatchUrl()
      return
    }
  }

//刪除資料
  const deleteSubmitContent = async (id : number) => {
    const response = await fetch ("http://127.0.0.1:5000",{
      method : "DELETE",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
      aIndex : id
      })
    })
    if(response.status === 204){
      await fetchCatchUrl()
      return
    }
  }


  useEffect(() => {
    fetchCatchUrl()
  },[])

  return (
    <>
      <div>
        <form>
          <input 
          type='text'
          id='addData'
          onChange={addContentChangeHandle}
          placeholder='請輸入資料'
          />

          <button
          type='submit'
          onClick={addsubmitNewContent}>
            Submit
          </button>
        </form>
        
        {listData === null ?

          <tr>
            <td className='text-center'>
              nodata
            </td>
            <td className='text-center'>
              loading
            </td>
          </tr>

        :

        listData.map(item => 
          <tr key={item.id}>
            <td className='text-center'>
              {item.id}
            </td>
            <td className='text-center'>
              {item.content}
            </td>
            <td className='text'>
              
              <button
              type='submit'
              onClick={() => reviseSubmitContent(item.id, item.content)}>
              revise
              </button>
            </td>
            <button
          type='submit'
          onClick={() => deleteSubmitContent(item.id)}>
          Delete
          </button>
          </tr>)

        }
      </div>
    </>
  )
}

export default App
