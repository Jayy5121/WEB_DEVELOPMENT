import { React, useRef, useState, useEffect } from 'react'
import Addbutton from './Addbutton'
import Copybutton from './Copybutton'
import Deletebtn from './Deletebtn'
import Editbtn from './Editbtn'
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef()
    const Passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    
    const getPassword =async() => { 
        let req= await fetch("http://localhost:3000/")
        let passwords = await req.json()
            setpasswordArray(passwords)
            console.log(passwords)
     }
    
    useEffect(() => {
       getPassword()
        

    }, [])

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {

        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            Passwordref.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            Passwordref.current.type = "password"
        }
    }

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id:form.id})
            });

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })  
            });
            
            
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))

            setform({ site: "", username: "", password: "" })
        }
        else{
            alert(" All inputs should contain more than 3elements")
        }
    }


    const DeletePassword =async (id) => {
        console.log(`Deleting password with id ${id}`)
        let c = confirm("Do you Really want to delete this password");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            await fetch("http://localhost:3000/", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({id})
            });
            // localStorage.setItem("passwords", JSON.stringify((passwordArray.filter(item => item.id !== id))))
        }

    }

    const EditPassword = async(id) => {
        

        console.log(`Editing password with id ${id}`)
        setform({...passwordArray.filter(item => item.id === id)[0],id:id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className=" w-[90vw] my-5 rounded-2xl text-white bg-blue-100/15 md:mycontainer mx-auto overflow-auto h-[86vh] scrollbar-hide">
                <h1 className='text-4xl my-5 text-blue-100 font-bold text-center'> PASSWORD MANAGER</h1>
                <p className='text-blue-100 text-center text-lg'>Your own Password Manager</p>
                <div className="text-white flex  justify-center items-center gap-3 flex-col p-4">

                    <input value={form.site} onChange={handleChange} placeholder='Enter Url' className='bg-white border border-blue-100 w-full text-black p-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white border w-full border-blue-100 text-black  p-4 py-1' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={Passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className=' bg-white border w-full border-blue-100 text-black  p-4 py-1' type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showpassword} >
                                <img ref={ref} className='p-1' width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>

                    </div>
                    <Addbutton onClick={savePassword} />
                </div>
                <div className="text-center passwords">
                    <h2 className="mt-[5%] font-bold text-xl">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&

                        <table className=" my-2 table-auto w-full overflow-hidden rounded-md">
                            <thead className="bg-blue-100/15 w-full">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-blue-100/5 ">
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>

                                        <td className="md:w-[40%]  py-1 border border-blue-100/5" > <div className="copybtn flex gap-3 items-center justify-center" onClick={() => { copytext(item.site) }}> <a href={item.site} target="_blank">
                                            <span>{item.site}</span></a> <Copybutton />
                                        </div>
                                        </td>
                                        <td className="md:w-[20%]  py-1 border border-blue-100/5 " ><div className="copybtn flex gap-3 items-center justify-center" onClick={() => { copytext(item.username) }}> <span>{item.username}</span><Copybutton /></div></td>
                                        <td className="md:w-[20%]  py-1 border border-blue-100/5 " ><div className="copybtn flex gap-3 items-center justify-center" onClick={() => { copytext(item.password) }}> <span>{item.password}</span><Copybutton /></div></td>
                                        <td className="md:w-[100%] py-1 border border-blue-100/5 flex gap-2 justify-center" ><span><Deletebtn onClick={() => { DeletePassword(item.id) }} /></span> <span><Editbtn onClick={() => { EditPassword(item.id) }} /> </span></td>
                                    </tr>
                                })}


                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
