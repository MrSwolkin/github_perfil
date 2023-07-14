import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCaregando, SetEstaCarregando] = useState(true);

    useEffect(() => {
        SetEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                SetEstaCarregando(false);
                setRepos(resJson);
            }, 3000)
        })
    }, [nomeUsuario]);
    return (
        <div className="container">
        {estaCaregando ? (
            <h1>Carregando...</h1>
        ) : (
            <ul className={styles.list}>
                {repos.map(repositorio => (
                    <li className={styles.listItem} key={repositorio.id}>
                        <div className={styles.itemName}>
                            <b>Nome:</b> 
                            {repositorio.name}
                        </div>
                        <div className={styles.itemLanguage}>
                            <b>Linguagem:</b> 
                            {repositorio.language}
                        </div>
                        <a className={styles.itemLink} target="_blanck" href={repositorio.html_url}>Visitar no Github</a>
                    </li>
                ))}
            </ul>
        )}
        
        </div>
    )
}

export default ReposList;