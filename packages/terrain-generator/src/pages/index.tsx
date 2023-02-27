import { Inter } from "@next/font/google";
import { Grid } from "./components/Grid";
import { TerrainType } from "./types";
import { generatePerlinValues } from "./utils";
import { useState, useEffect } from "react";
import MySpinner from './components/MySpinner';
import MyHeader from './components/MyHeader';
import MyModal from './components/MyModal';
import { Button } from '@chakra-ui/react';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const width = 300;
  const height = 300;
  const [values, setValues] = useState<TerrainType[][]>([]);
  const [permArray,setPermArray] = useState<number[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefresh = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const {valuesArray,perm} = generatePerlinValues(height, width);
    setValues(valuesArray);
    setPermArray(perm)
    setRefresh(() => refresh + 1);
    console.log(refresh);
  };
  
  const handleGo = ()=>{
    console.log(permArray)
  }

  useEffect(() => {
    setIsLoading(false);
  },[values])

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <MyHeader />
        {
          isLoading === true ? 
          ( <MySpinner width={width}></MySpinner> ): 
          <div>
            {refresh === 0 ? null : (
              <Grid width={width} height={height} values={values} />
            )}
          </div>
        }
        <div className="flex flex-row mt-5">
          {refresh !== 0 && <>
            <MyModal />
            <Button rounded="full" colorScheme="orange" ml="2" mb="2" p="5">Go</Button>
          </>  
          }
          <Button onClick={handleRefresh} rounded="full" colorScheme="orange" ml="2" mb="2" p="5">
            {refresh === 0 ? "Generate" : "Refresh the Map"}
          </Button>
        </div>
      </div>
    </>
  );
}
