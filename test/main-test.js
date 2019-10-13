'use strict';

// import { decode } from "punycode";

describe('pos', () => {
  it('should return decoded barcodes when decode barcodes given array of string tags', () => {
    const tagsList = ['ITEM000001', 'ITEM000002-2'];

    const result = decodeBarcodes(tagsList);

    const expected = [{
        barcode: 'ITEM000001',
        count: 1
      },
      {
        barcode: 'ITEM000002',
        count: 2
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return items without count when load items given decoded barcodes', () => {
    const decodedBarcodes = [{
        barcode: 'ITEM000001',
        count: 1
      },
      {
        barcode: 'ITEM000002',
        count: 2
      }
    ];

    const result = loadItems(decodedBarcodes);

    const expected = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle'
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound'
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return combined items when combine items given decoded barcodes', () => {
    const decodedBarcodes = [{
        barcode: 'ITEM000001',
        count: 1
      },
      {
        barcode: 'ITEM000002',
        count: 2
      }
    ];

    const result = combineItems(decodedBarcodes);

    const expected = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 1
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return list of items when decode tags given array of string tags', () => {
    const tagsList = [
      'ITEM000001',
      'ITEM000002-2'
    ];

    const result = decodeTags(tagsList);

    const expected = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 1
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return receipt items when promote receipt items given list of items', () => {
    const items = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 3,
        subtotal: 9.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2,
        subtotal: 11.00
      }
    ];

    const result = promoteReceiptItems(items);

    const expected = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 3,
        subtotal: 6.0
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2,
        subtotal: 11.00
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return receipt items when calculate receipt items given list of items', () => {
    const items = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 2
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2
      }
    ];

    const result = calculateReceiptItems(items);

    const expected = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 2,
        subtotal: 6.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2,
        subtotal: 11.00
      }
    ];

    expect(result).toEqual(expected);
  });

  it('should return receipt items with total when calculate total given receipt items', () => {
    const receiptItems = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 2,
        subtotal: 6.00
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2,
        subtotal: 11.00
      }
    ];

    const result = calculateReceiptTotal(receiptItems);

    const expected = {
      receiptItems: [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          price: 3.00,
          unit: 'bottle',
          count: 2,
          subtotal: 6.00
        },
        {
          barcode: 'ITEM000002',
          name: 'Apple',
          price: 5.50,
          unit: 'pound',
          count: 2,
          subtotal: 11.00
        }
      ],
      total: 17.00
    };

    expect(result).toEqual(expected);
  });

  it('should return receipt items with savings when calculate savings given receipt items', () => {
    const receipt = {
      receiptItems: [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          price: 3.00,
          unit: 'bottle',
          count: 3,
          subtotal: 6.00
        },
        {
          barcode: 'ITEM000002',
          name: 'Apple',
          price: 5.50,
          unit: 'pound',
          count: 2,
          subtotal: 11.00
        }
      ],
      total: 17.00
    };

    const result = calculateReceiptSavings(receipt);

    const expected = {
      receiptItems: [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          price: 3.00,
          unit: 'bottle',
          count: 3,
          subtotal: 6.00
        },
        {
          barcode: 'ITEM000002',
          name: 'Apple',
          price: 5.50,
          unit: 'pound',
          count: 2,
          subtotal: 11.00
        }
      ],
      total: 17.00,
      savings: 3.00
    };

    expect(result).toEqual(expected);
  });

  it('should return receipt when calculate receipt given list of items', () => {
    const items = [{
        barcode: 'ITEM000001',
        name: 'Sprite',
        price: 3.00,
        unit: 'bottle',
        count: 3
      },
      {
        barcode: 'ITEM000002',
        name: 'Apple',
        price: 5.50,
        unit: 'pound',
        count: 2
      }
    ];

    const result = calculateReceipt(items);

    const expected = {
      receiptItems: [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          price: 3.00,
          unit: 'bottle',
          count: 3,
          subtotal: 6.00
        },
        {
          barcode: 'ITEM000002',
          name: 'Apple',
          price: 5.50,
          unit: 'pound',
          count: 2,
          subtotal: 11.00
        }
      ],
      total: 17.00,
      savings: 3.00
    };

    expect(result).toEqual(expected);
  });

  it('should return formatted receipt when render receipt given receipt', () => {
    const receipt = {
      receiptItems: [{
          barcode: 'ITEM000001',
          name: 'Sprite',
          price: 3.00,
          unit: 'bottle',
          count: 3,
          subtotal: 6.00
        },
        {
          barcode: 'ITEM000002',
          name: 'Apple',
          price: 5.50,
          unit: 'pound',
          count: 2,
          subtotal: 11.00
        }
      ],
      total: 17.00,
      savings: 3.00
    };

    const result = renderReceipt(receipt);

    const expected = '***<store earning no money>Receipt ***\n' +
      'Name: Sprite, Quantity: 3 bottles, Unit: 3.00(yuan), Subtotal: 6.00(yuan)\n' +
      'Name: Apple, Quantity: 2 pounds, Unit: 5.50(yuan), Subtotal: 11.00(yuan)\n' +
      '----------------------\n' +
      'Total: 17.00(yuan)\n' +
      'Discounted prices: 3.00(yuan)\n' +
      '**********************';

    expect(result).toEqual(expected);
  });

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expected = '***<store earning no money>Receipt ***\n' +
      'Name: Sprite, Quantity: 5 bottles, Unit: 3.00(yuan), Subtotal: 12.00(yuan)\n' +
      'Name: Litchi, Quantity: 2.5 pounds, Unit: 15.00(yuan), Subtotal: 37.50(yuan)\n' +
      'Name: Instant Noodles, Quantity: 3 bags, Unit: 4.50(yuan), Subtotal: 9.00(yuan)\n' +
      '----------------------\n' +
      'Total: 58.50(yuan)\n' +
      'Discounted prices: 7.50(yuan)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expected);
});
});
