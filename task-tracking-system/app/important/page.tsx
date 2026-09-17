"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../components/Tasks/Tasks';

function page() {

  const { importntTasks } = useGlobalState();
  return  <Tasks title="Important Tasks" tasks={importntTasks} />;

}

export default page;