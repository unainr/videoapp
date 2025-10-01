import {parseAsInteger,parseAsString,createLoader}from'nuqs/server'

import { DEFAULT_PAGE } from '@/lib/constants'


export const FiltersSearchParams = {
     search:parseAsString.withDefault('').withOptions({clearOnDefault:true}),
    page:parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true})
}

export const loadSearchParams = createLoader(FiltersSearchParams)