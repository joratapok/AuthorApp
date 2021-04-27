import React, {useEffect, useState} from 'react'
import classes from './ReaderBox.module.css'
import {ChaptersType} from "../../../api/api"
import {Pagination} from "@material-ui/lab"
import {Box} from "@material-ui/core"
import ScrollContainer from "react-indiana-drag-scroll";

type BookDetailType = {
    bookId: number
    chapters: ChaptersType
    toggleReader: boolean
    getNewChapter: (event: object, numPage: number) => void
}

export const ReaderBox: React.FC<BookDetailType> = ({bookId, chapters, toggleReader, getNewChapter}) => {

    const [modal, setModal] = useState(false)

    useEffect(() => {
        setModal(toggleReader)
    }, [toggleReader])

    let modalClass = classes.modal + ' ' + ( modal ? classes.activeModal : '')
    let contentModalClass = classes.contentModal + ' ' + ( modal ? classes.activeContentModal : '')
    let contentWrapper = classes.contentWrapper + ' ' + ( modal ? classes.activeContentWrapper : '')

    return (
        <div>
            <div className={modalClass}>
            </div>


            <div className={contentWrapper}>


                <ScrollContainer className='container'>
                <div className={contentModalClass}>
                    <Box display='flex' justifyContent='center' my={1}>
                        <Pagination count={chapters.count} color="primary" onChange={getNewChapter}/>
                    </Box>
                    some test text ----
                    {chapters.results.length && chapters.results[0].chapter}
                </div>
                </ScrollContainer>
            </div>

        </div>
    )
}

export default ReaderBox;
