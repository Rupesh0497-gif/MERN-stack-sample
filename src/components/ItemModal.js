import React,{useState} from 'react'
const ItemModal = ({item, currentId, onAddCart}) =>{
    const [addedCount, setAddedCount] = useState(1)
    const onAdd = (name, price, count, category) =>{
      onAddCart(name, price, count, category)
    }
    return (
<>
<div class="modal fade" id={`exampleModalToggle_${currentId}`} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">{item.itemNameToAdd}</h5>
        <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
      </div>
      <div class="modal-body">
        This is {item.itemCategory} and which is from {item.itemOrigin}
      </div>
      <div class="modal-footer">
        <span style={{ fontSize: '20px', padding: '5px', border: '1px solid black', "border-radius": "50%", "marginRight": "20px"}}
        onClick={(e)=>{
            let currentCount = addedCount - 1;
            setAddedCount(currentCount)
        }}>-</span>
        <span style={{fontSize: '15px', padding: '10px', border: '1px solid #ddd', backgroundColor: '#ddd', 'border-radius': '50%',  "marginRight": "20px"}}>{addedCount}</span>
        <span style={{ fontSize: '20px', padding: '5px', border: '1px solid black', "border-radius": "50%",  "marginRight": "20px"}}
        onClick={(e)=>{
            let currentCount = addedCount + 1;
            setAddedCount(currentCount)
        }}>+</span>
        <button 
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        aria-label="Close"
        data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={(e)=>{onAdd(item.itemNameToAdd, item.itemPrice, addedCount, item.itemCategory.toLowerCase())}}>Add Item</button>
      </div>
    </div>
  </div>
</div></>
    )
}
export default ItemModal;