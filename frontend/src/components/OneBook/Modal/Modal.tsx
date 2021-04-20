import React, {useEffect, useState} from 'react'
import classes from './Modal.module.css'

type BookDetailType = {
    setOn: boolean
}

export const Modal: React.FC<BookDetailType> = ({setOn}) => {

    const [move, setMove] = useState({y: 0})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        setModal(setOn)
    }, [setOn])

    let setFromEvent = (e: MouseEvent) => {
        setMove({y: e.clientY})
    }

    const moveOn = (e: any) => {
        e.preventDefault()
        console.log('MOVEON')
        window.addEventListener('mousemove', setFromEvent)
    }

    const moveOff = (e: any) => {
        e.preventDefault()
        console.log('MOVEOFF')
        window.removeEventListener('mousemove', setFromEvent)
    }

    let modalClass = classes.modal + ' ' + ( modal ? classes.activeModal : '')
    let contentModalClass = classes.contentModal + ' ' + ( modal ? classes.activeContentModal : '')
    let contentWrapper = classes.contentWrapper + ' ' + ( modal ? classes.activeContentWrapper : '')

    return (
      <div>
            <div className={modalClass} onPointerDown={moveOn} onPointerUp={moveOff}>
            </div>

            <div className={contentWrapper}>
                <div className={contentModalClass}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit amet tellus id lacus imperdiet accumsan. Curabitur rutrum elementum urna vel imperdiet. Pellentesque consectetur luctus ex eu feugiat. Aenean consectetur quam vel enim eleifend dictum. Fusce eget diam ut nunc facilisis ultrices sed in dolor. Phasellus eu odio rhoncus, accumsan risus suscipit, placerat nisi. Cras efficitur, arcu vel rhoncus gravida, urna risus pellentesque purus, vitae ultricies elit libero aliquam metus.
            Nunc vel urna eget sem sagittis fermentum. Ut sit amet porta dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas auctor lobortis molestie. Nulla viverra ultrices luctus. In hendrerit vestibulum risus. Cras non consequat nibh.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum volutpat lacus vel lacus ultricies aliquam. In lectus diam, commodo non augue non, lobortis porta metus. Vivamus augue nisi, rutrum id dolor vel, tristique efficitur nunc. Vivamus lacinia suscipit urna sit amet malesuada. Vivamus vitae eros iaculis, pretium nunc eget, mollis quam. Curabitur aliquet, lacus et ultricies lacinia, felis urna gravida magna, sit amet vulputate tortor elit sit amet arcu. Aliquam sit
                </div>
            </div>

      </div>

    )
}

export default Modal;
