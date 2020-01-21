import React, {useState, useContext, useCallback, useEffect} from 'react';
import { useHttp } from '../hooks/http'
import AuthContext from '../context/AuthContext';
import Loader from '../components/Loader'
import LinkList from '../components/LinkList'

const Links = () => {
    const [links, setLinks] = useState('');
    const {loading, request} = useHttp();
    const { token } = useContext(AuthContext)

    const linksFetched = useCallback(async ()=>{
       try {
            const fetched = await request('/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
       }catch(e){}
    },[token, request])

    const removeLink = useCallback(async (id) => {
        try {
             await request(`/api/links/remove/${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
       } catch (e) {}
    },[token,request])


    useEffect(()=>{
        linksFetched()
    }, [token, request, linksFetched])

    if(loading) {
        return <Loader/>
    }
    return (
        <>
             {!loading && <LinkList links={links} removeLink={removeLink}/>}
        </>
    );
};

export default Links;