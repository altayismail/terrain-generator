import { Grid } from "../TerrainComp/Grid";
import { TerrainType } from "../../../terrain-helper/types";
import { generatePerlinValues } from "../../../terrain-helper/utils";
import { useState, useEffect, MouseEvent} from "react";
import MySpinner from '../ChakraComp/MySpinner';
import MyModal from '../ChakraComp/MyModal';
import { Button } from '@chakra-ui/react';

function Menu() {
    const width = 100;
    const height = 100;
    const [values, setValues] = useState<TerrainType[][]>([]);
    const [permArray, setPermArray] = useState<number[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRefresh = (event: MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const {valuesArray,perm} = generatePerlinValues(height, width);
        setValues(valuesArray);
        setPermArray(perm)
        setRefresh(() => refresh + 1);
    };

    useEffect(() => {
        setIsLoading(false);
        document.body.style.backgroundImage = `url("https://lh6.googleusercontent.com/3TdoYfJ64QmarysrYflBxJqDc89ts65PnS5xSClVEn0Y9tvcXEP_wIpu8HIXpFy1ISI=w2400")`;
    },[values])

    return (
        <div className="container">
            <div className="row align-items-center justify-content-center h-screen items-center">
                {
                    isLoading === true ? 
                    <div className="col-8 align-items-center justify-content-center">
                        ( <MySpinner></MySpinner> )
                    </div> :
                    <>
                    {refresh === 0 ? null : (
                        <div className="col-8 align-items-center justify-content-center">
                        <Grid width={width} height={height} values={values} />
                        </div>
                    )}
                    </>
                }
                <div className="col align-items-center justify-content-center">
                    <h2 className="text-center text-white mb-2 display-4 border-top border-bottom font-bold">Chaquer</h2>
                    <img className="m-auto mb-5" src="https://lh5.googleusercontent.com/8xqRbdHpf2hVn8MASJOnN05jQuhjcKda5zdGyRPlFIR3vtLdcDig5_t0fu24BkTujow=w2400" style={{width:"250px",height:"250px", justifyContent:"center"}}></img>
                    {refresh !== 0 &&
                    <div className="text-center mt-2 mb-2">
                        <Button colorScheme="blackAlpha" border="solid" width="200px" isDisabled ={isLoading} textColor="white" variant="ghost" p="7">Start the Game</Button>
                    </div>
                    }
                    <div className="text-center mb-2">
                        <Button colorScheme="blackAlpha" border="solid" width="200px" isDisabled={isLoading} textColor="white" variant="ghost" onClick={handleRefresh} p="7">
                        {refresh === 0 ? "Generate Terrain" : "Regenerate the Terrain"}
                        </Button>
                    </div>
                    {refresh !== 0 &&
                    <div className="text-center">
                        <MyModal />
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Menu
