import {useEffect, useState} from 'react';
import {useStore, loadStore, StoreSchema, Store} from '../context/store';

const STORAGE_KEY = 'savedConfigs';

function loadConfigs(): Record<string, Store> {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // validate each store
            const valid: Record<string, Store> = {};
            for (const [name, value] of Object.entries(parsed)) {
                try {
                    valid[name] = StoreSchema.parse(value);
                } catch {
                    // ignore invalid entry
                }
            }
            return valid;
        } catch {
            return {};
        }
    }
    return {};
}

function saveConfigs(configs: Record<string, Store>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
}

export default function ConfigBanner() {
    const [store, dispatch] = useStore();
    const [configs, setConfigs] = useState<Record<string, Store>>({});
    const [selected, setSelected] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        setConfigs(loadConfigs());
    }, []);

    function saveCurrent() {
        if (!name) return;
        const newConfigs = {...configs, [name]: store};
        setConfigs(newConfigs);
        saveConfigs(newConfigs);
        setName('');
    }

    function loadSelected() {
        const config = configs[selected];
        if (config) {
            dispatch(loadStore(config));
        }
    }

    const options = Object.keys(configs).map((n, i) => (
        <option key={i} value={n}>{n}</option>
    ));

    return (
        <div className="ConfigBanner">
            <input
                type="text"
                placeholder="Config name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={saveCurrent}>Save</button>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="" disabled>Select saved...</option>
                {options}
            </select>
            <button onClick={loadSelected} disabled={!selected}>Load</button>
        </div>
    );
}
