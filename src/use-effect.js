import React, {useState, useEffect, useCallback, useMemo, Component} from "react";

const Counters = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>+</button>
                <button onClick={() => setVisible(false)}>hide</button>

                <HookCounter value={value}/>
                <ClassCounter value={value}/>

                <Notification/>

                <PlanetInfo id={value}/>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={() => setVisible(true)}>show</button>
            </div>
        );
    }
};



const HookCounter = ({value}) => {

    useEffect(() => {
        console.log('didMount')
        return () => {console.log('willUnmount')}
    }, []);

    useEffect(() => {
        console.log('didUpdate')
    });

    return <p>{value}</p>
};



class ClassCounter extends Component {
    render() {
        return <p>{this.props.value}</p>
    };
}



const Notification = () => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    if (visible) {
        return <div><p>Sample notification</p></div>
    } else {
        return null;
    }
};



const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
};

const useRequest = (request) => {

    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: false
    }), []);

    const [dataState, setDataState] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data: data,
                loading: false,
                error: false
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error: error
            }));
        return () => cancelled = true;
    },[request, initialState]);

    return dataState;
};

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id])
    return useRequest(request);
};

const PlanetInfo = ({id}) => {

    const {data, loading, error} = usePlanetInfo(id);

    if (error) {
        return <div>Something is wrong</div>
    }
    if (loading) {
        return <div>loading...</div>
    }
    if (id === 0) {
        return null
    }

    return (
        <div>{id} - {data && data.name}</div>
    );
};

export {Counters, Notification, PlanetInfo};
