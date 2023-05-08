import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/fetchTodos'
import profileStyles from '../styles/user.module.css'

export default function UserProfile() {
    const { userInfo, currentUser } = useAuth()
    const [edit, setEdit] = useState(null)
    const [todo, setTodo] = useState('')
    const [edittedValue, setEdittedValue] = useState('')

    const { todos, setTodos, loading, error } = useFetchTodos()



    // console.log(todos)

    // useEffect(() => {
    //     if (!userInfo || Object.keys(userInfo).length === 0) {
    //         setAddTodo(true)
    //     }
    // }, [userInfo])

    async function handleAdd() {
        if (!todo) { return }
        const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
        setTodos({ ...todos, [newKey]: todo })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: todo
            }
        }, { merge: true })
        setTodo('')
    }

    async function handleEdit() {
        if (!edittedValue) { return }
        const newKey = edit
        setTodos({ ...todos, [newKey]: edittedValue })
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [newKey]: edittedValue
            }
        }, { merge: true })
        setEdit(null)
        setEdittedValue('')
    }

    function handleAddEdit(todoKey) {
        return () => {
            // console.log(todos[todoKey])
            setEdit(todoKey)
            setEdittedValue(todos[todoKey])
        }
    }

    function handleDelete(todoKey) {
        return async () => {
            const tempObj = { ...todos }
            delete tempObj[todoKey]

            setTodos(tempObj)
            const userRef = doc(db, 'users', currentUser.uid)
            await setDoc(userRef, {
                'todos': {
                    [todoKey]: deleteField()
                }
            }, { merge: true })

        }
    }

    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.inputs}>
                <input type='text' placeholder="Enter todo" value={todo} onChange={(e) => setTodo(e.target.value)} className={profileStyles.add} />
                <button onClick={handleAdd} className={profileStyles.addButton}>ADD</button>
            </div>
            {(loading) && (<div className={profileStyles.load}>
                <i className={profileStyles.spinner}></i>
            </div>)}
            {(!loading) && (
                <>
                    {Object.keys(todos).map((todo, i) => {
                        return (
                            <TodoCard handleEdit={handleEdit} key={i} handleAddEdit={handleAddEdit} edit={edit} todoKey={todo} edittedValue={edittedValue} setEdittedValue={setEdittedValue} handleDelete={handleDelete}>
                                {todos[todo]}
                            </TodoCard>
                        )
                    })}
                </>
            )}
        </div>
    )
}
