interface FeatureFilter {
    [x: string]: {
        ID: string
        VALUE: string
        MAX_ID?: string
        MIN_ID?: string
    }
}

export const FEATURE_FILTER: FeatureFilter = {
    GENDER: {
        ID: 'gender',
        VALUE: 'GENDER'
    },
    SPECIE: {
        ID: 'specieId',
        VALUE: 'SPECIE'
    },
    SIZE: {
        ID: 'size',
        VALUE: 'SIZE'
    },
    BREED: {
        ID: 'breedId',
        VALUE: 'BREED'
    },
    AGE: {
        ID: 'age',
        VALUE: "AGE",
        MAX_ID: 'Maxima Edad',
        MIN_ID: 'Minima Edad'
    }
}