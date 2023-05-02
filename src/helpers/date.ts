

export function dmy(iso: string) {
    if (iso) return iso.substring(0, 10)
}

export function dmy_to_iso(iso: string) { //?
    const arr = iso.split("-")
    console.log(arr)
    const d = new Date('05 October 2011 14:48 UTC');
}

export function hm(iso: string) { //?
    if (iso) return iso.substring(11, 16)
}