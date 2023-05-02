import axios from 'axios'
import API_URL from '@/helpers/env'

export async function user_mailExist(email: string) {
    try {
        const response = await axios.get(`${API_URL}/user.mail_exists`, { params: { mail: email } })
        const json = response.data
        return json.is_exists
    } catch (err) {
        console.error(err)
    }
}

export async function reg_sendCode(email: string) {
    try {
        const response = await axios.get(`${API_URL}/reg.send_code`, { params: { to_mail: email } })
        const json = response.data
        return json.is_done
    } catch (err) {
        console.error(err)
    }
}

export async function auth_sendCode(email: string) {
    try {
        const response = await axios.get(`${API_URL}/auth.send_code`, { params: { to_mail: email } })
        const json = response.data
        return json.is_done
    } catch (err) {
        console.error(err)
    }
}

export async function reg(email: string, code: string) { //////////
    try {
        const response = await axios.post(`${API_URL}/reg?`, {mail: email, code: code} )
        const json = response.data
        console.log(json)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function auth(email: string, code: string) {
    try {
        const response = await axios.post(`${API_URL}/auth?`, {mail: email, code: code} )
        const json = response.data
        console.log(json)
        return json
    } catch (err) {
        console.error(err)
    }
}


export async function event_all(token: string | null) {
    try {
        const response = await axios.get(`${API_URL}/event.all?`, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function me(token: string | null) {
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/me?`, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function me_update(token: string | null, fullname: string, birth_dt: string, tg_username: string, description: string) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.post(`${API_URL}/me.update`, {fullname: fullname, birth_dt: '2023-04-27T08:16:56.288000', tg_username: tg_username, description: description}, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function event_requestsToCreateEvent(token: string | null, json: any) {
    console.log(token)
    json.start_dt += "T08:16:56.288000"
    json.end_dt += "T08:16:56.288000"
    if (!token) return
    try {
        const response = await axios.post(`${API_URL}/event.requests_to_create_event`, json, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        const jsonRes = response.data
        return jsonRes
    } catch (err) {
        console.error(err)
    }
} 

export async function event_getAllRequestsToCreateEvent(token: string | null/*, requestor_int_id: number*/) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/event.get_all_requests_to_create_event`, {/*params: {requestor_int_id},*/ headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function me_myRequests(token: string | null/*, requestor_int_id: number*/) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/me.my_requests`, {/*params: {requestor_int_id},*/ headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function event_acceptRequestToCreate(token: string | null, event_request_int_id: any) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/event.accept_request_to_create`, {params: {event_request_int_id}, headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function user_all(token: string | null) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/user.all`, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function user_editrole(token: string | null, user_int_id: string, role: string) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/user.edit_role`, {params: {user_int_id, role}, headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function event_feedbacks(token: string | null) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/event.feedbacks`, { headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function event_getByIntId(token: string | null, int_id: string | string[] | undefined) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/event.get_by_int_id`, { params: {int_id}, headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function event_analytics(token: string | null, int_id: string | string[] | undefined) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/event.analytics`, { params: {event_int_id: int_id}, headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}

export async function me_scream(token: string | null, text: string) {
    console.log(token)
    if (!token) return
    try {
        const response = await axios.get(`${API_URL}/me.scream`, { params: {text}, headers: {
            'Authorization': `Bearer ${token}`
        }})
        const json = response.data
        console.log(response)
        return json
    } catch (err) {
        console.error(err)
    }
}