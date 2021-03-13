export interface Address {
    type: 'HOME' | 'SECOND_HOME' | 'WORK' | 'HOLIDAY' | 'RELATIVE',
    email?: string,
    phone?: string,
    street?: string,
    city?: string,
    zipcode?: string,
    country?: string
}

