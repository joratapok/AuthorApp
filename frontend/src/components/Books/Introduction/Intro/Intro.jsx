import React, {Component} from 'react'
import Typical from 'react-typical'
import classes from './Intro.module.css'


const steps = [
    'Приветствую вас друзья 👋', 1000,
    'Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой.', 1000,
    'Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой. Здесь вы найдете только оху', 200,
    'Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой. Здесь вы найдете только отличные книги', 1000,
    'Приветствую вас друзья 👋 Вы на сайте авторской книги Дарьи Урусовой. Здесь вы найдете только отличные книги. Приятного чтения', 1000,
];
export default class Intro extends Component {
    render() {
        return (
            <div className={classes.introWrapper}>
                <Typical wrapper="span" steps={steps} loop={1} className={classes.intro}/>
            </div>
        )
    }
}
