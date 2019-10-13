'use strict';

function decodeBarcodes(tagsList) {
    let decodedBarcodes = [];
    tagsList.forEach(tag => {
        const decodedTag = splitTag(tag);
        const isExisting = decodedBarcodes.find(decodedBarcode => decodedBarcode.barcode === decodedTag.barcode);
        if (isExisting) {
            isExisting.count += decodedTag.count;
        } else {
            decodedBarcodes.push(decodedTag);
        }
    });
    return decodedBarcodes;
}

function splitTag(tag) {
    let barcode;
    let count;
    [barcode, count] = tag.split('-');

    return {
        barcode: barcode,
        count: (count) ? parseFloat(count) : 1
    };
}

function loadItems(decodedBarcodes) {
    const allLoadedItems = loadAllItems();
    const loadItems = (item) => {
        return allLoadedItems.find(loadItem => loadItem.barcode === item.barcode);
    }
    return decodedBarcodes.map(loadItems);
}

function combineItems(decodedBarcodes) {
    let loadedItems = loadItems(decodedBarcodes);
    loadedItems.forEach(loadedItem => {
        let decodedItem = decodedBarcodes.find(item => item.barcode === loadedItem.barcode);
        loadedItem.count = decodedItem.count;
    });
    return loadedItems;
}

function decodeTags(tagsList) {
    const decodedBarcodes = decodeBarcodes(tagsList);
    return combineItems(decodedBarcodes);
}

function promoteReceiptItems(items) {
    const promoBarcodes = loadPromotions()[0].barcodes;
    items.forEach(item => {
        if (promoBarcodes.includes(item.barcode) && item.count > 2) {
            item.subtotal -= item.price;
        }
    });
    return items;
}

function calculateReceiptItems(items) {
    items.forEach(item => {
        item.subtotal = item.price * item.count;
    });
    return promoteReceiptItems(items);
}

function calculateReceiptTotal(receiptItems) {
    let total = 0;
    receiptItems.forEach(item => {
        total += item.subtotal;
    });
    return {
        receiptItems: receiptItems,
        total: total
    };
}

function calculateReceiptSavings(receipt) {
    let actualTotal = 0;
    receipt.receiptItems.forEach(item => {
        actualTotal += item.price * item.count;
    });
    receipt.savings = actualTotal - receipt.total;
    return receipt;
}

function calculateReceipt(items) {
    const receiptItems = calculateReceiptItems(items);
    const receipt = calculateReceiptTotal(receiptItems);

    return calculateReceiptSavings(receipt);
}

function renderReceipt(receipt) {
    let formattedReceipt = '***<store earning no money>Receipt ***\n';
    receipt.receiptItems.forEach(items => {
        formattedReceipt += `Name: ${items.name}, Quantity: ${items.count} ${items.unit}s, Unit: ${items.price.toFixed(2)}(yuan), Subtotal: ${items.subtotal.toFixed(2)}(yuan)\n`;
    });
    formattedReceipt += '----------------------\n' +
        `Total: ${receipt.total.toFixed(2)}(yuan)\n` +
        `Discounted prices: ${receipt.savings.toFixed(2)}(yuan)\n` +
        '**********************';
    return formattedReceipt;
}

function printReceipt(tags) {
    const itemList = decodeTags(tags);
    const receipt = calculateReceipt(itemList);

    console.log(renderReceipt(receipt));
}