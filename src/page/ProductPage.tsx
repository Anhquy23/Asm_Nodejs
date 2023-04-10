const ProductPage = (props) =>{ // nhận props từ App.tsx

    return (
        <div>
            {props.products.map((item) =>{
                return <div key= {item.id}>
                    <h2>{item.name}</h2>
                </div>
            })}
        </div>
    )
}

export default ProductPage