import React, { useState } from 'react'
import SelectWarehousePartial from './SelectWarehousePartial'
import ListProductAtWareHouse from './ListProductAtWareHouse'

export default function ManageProductAt() {
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    
    return (
        <>
            <SelectWarehousePartial
                selectedWarehouseId={selectedWarehouseId}
                onSelectWarehouse={setSelectedWarehouseId}
            />
            {selectedWarehouseId && <ListProductAtWareHouse warehouseId={selectedWarehouseId} />}
        </>
    )
}
