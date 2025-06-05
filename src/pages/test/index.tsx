import supabase from '@/lib/db';
import { INews } from '@/types/news';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Test = () => {
    const [news, setNews] = useState<INews[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase.from('news').select('*');

            if (error) console.log('error:' + error);
            else setNews(data);
        }
        fetchNews()
    }, [supabase])

    console.log(news);
    return (
        <div>
            <ul>
                {news.map((item) => (
                    <li key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        <Image src={item.image} width={1000} height={720} alt='gambar' />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Test
