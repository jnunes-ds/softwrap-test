import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { getRecords } from '../utils/Table';

export default function Home() {

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  )
}
