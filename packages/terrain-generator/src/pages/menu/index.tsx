import { Grid } from "../components/TerrainComp/Grid";
import { generatePerlinValues } from "../../terrain-helper/utils";
import { MouseEvent } from "react";
import { Button } from '@chakra-ui/react';
import { useTerrain } from "@/context/TerrainContext";
import MySpinner from '../components/ChakraComp/MySpinner';

function Menu() {
    const { setIsLoading,
        width,
        height,
        setValues,
        values,
        setRefresh,
        refresh,
        isLoading,
        setPermArray } = useTerrain();

    const handleRefresh = (event: MouseEvent<HTMLButtonElement>) => {
        setIsLoading(true);
        event.preventDefault();
        const { valuesArray, perm } = generatePerlinValues(height, width);
        setValues(valuesArray);
        setPermArray(perm)
        setRefresh(() => refresh + 1);
    };

    const terrainStyles = [8, 25];

    return (
        <div style={{ backgroundImage: `url('/images/dungeon.png')`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
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
                                        <Grid width={width} height={height} values={values} pixelStyles={terrainStyles} />
                                    </div>
                                )}
                            </>
                    }
                    <div className="col align-items-center justify-content-center">
                        <h2 className="text-center text-white mb-2 display-6 border-top border-bottom font-bold">Chaquer - Terrain Generator</h2>
                        <img className="m-auto mb-5" src='/images/castle.png' style={{ width: "250px", height: "250px", justifyContent: "center" }}></img>
                        <div className="text-center mb-2">
                            <Button
                                colorScheme="blackAlpha"
                                border="solid"
                                width="200px"
                                isLoading={isLoading}
                                textColor="white"
                                onClick={handleRefresh}
                                p="7">
                                {refresh === 0 ? "Generate Terrain" : "Regenerate the Terrain"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu