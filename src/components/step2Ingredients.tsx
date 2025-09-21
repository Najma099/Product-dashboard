import React from 'react';

export const Step2Ingredients = ({ formData, setFormData, errors }: any) => {

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({...formData, ingredients: newIngredients});
  };

  const addIngredient = () => {
    setFormData({...formData, ingredients: [...formData.ingredients, '']});
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_: any, i: number) => i !== index);
    setFormData({...formData, ingredients: newIngredients});
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Ingredients *</label>
        {formData.ingredients.map((ingredient: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={e => handleIngredientChange(index, e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            {formData.ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)} className="ml-2 text-red-600">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          Add Ingredient
        </button>
        {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
      </div>

      <div>
        <label className="block mb-2">Origin Country *</label>
        <input type="text" value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
        {errors.origin && <p className="text-red-500 text-sm">{errors.origin}</p>}
      </div>

      <div>
        <label className="block mb-2">Supplier *</label>
        <input type="text" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
        {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
      </div>
    </div>
  );
};
