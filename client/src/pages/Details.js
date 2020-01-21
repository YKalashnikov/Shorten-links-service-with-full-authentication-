import React, {
    useState,
    useCallback,
    useEffect,
    useContext} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';
import AuthContext from '../context/AuthContext';

const Details = () => {
        const { token} = useContext(AuthContext);
        const { request,loading} = useHttp();
        const [link, setLink] = useState(null);
        const linkId = useParams().id

        const getLink = useCallback(async () => {
            try {
                const linkFetched = await request(`/api/links/${linkId}`, 'GET', null, {
                    Authorization: `Bearer ${token}`
                })
                setLink(linkFetched)
            } catch (e) {}
        }, [token, linkId, request])

        const removeLink = useCallback(async (id) => {
            try {
                 await request(`/api/links/remove/${id}`, 'DELETE', null, {
                    Authorization: `Bearer ${token}`
                })

           } catch (e) {}
        },[token,request ])

        useEffect(() => {
            getLink()
        }, [getLink])


        if (loading) {
            return <Loader / >
        }
        return (
             <div>
            <h1> Details </h1> {
                !loading  && link && <LinkCard link = {link
                }removeLink = {removeLink}/>}
                 </div>
            );
        };

        export default Details;