import {parseAsInteger,parseAsString,createLoader, parseAsStringEnum}from'nuqs/server'

import { DEFAULT_PAGE } from '@/lib/constants'
import { MeetingStatus } from './types'


export const FiltersSearchParams = {
     search:parseAsString.withDefault('').withOptions({clearOnDefault:true}),
    page:parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault:true}),
     status:parseAsStringEnum(Object.values(MeetingStatus)),
        agentId: parseAsString.withDefault('').withOptions({clearOnDefault:true}),
}

export const loadSearchParamsMeeting = createLoader(FiltersSearchParams)