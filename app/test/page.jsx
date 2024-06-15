
const Page=()=>{

  const handleForm= async (formData)=>{
    'use server'
    console.log(formData)
    const title = formData.get('title')
    console.log(title)
    console.log('hello')
  }
  return (
    <div>
        <form action={handleForm}>
            <input type="text" name='title'/>
            <button >Send</button>
        </form>
    </div>
  )
}
export default Page