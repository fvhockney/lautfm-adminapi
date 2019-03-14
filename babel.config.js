module.exports = api => {
    const presets = [
        [
            '@babel/preset-env',
        ]
    ]

    if ( !api.env('test') ){
        presets[ 0 ].push( { modules: false } )
    }

    return { presets }
}
