{/* ... Le reste du code reste identique ... */}

<div className="space-y-6">
  {fields.map((field, index) => (
    <div
      key={field.id}
      className="bg-white rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm
      hover:border-primary/20 hover:shadow-md transition-all duration-200"
    >
      <div className="bg-gray-50 px-6 py-3 border-b-2 border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Champ {index + 1}
          {field.required && (
            <span className="ml-2 text-xs font-medium text-red-500">
              Requis
            </span>
          )}
        </span>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => handleFieldChange(field.id, { required: e.target.checked })}
              className="form-checkbox"
            />
            <span className="text-sm text-gray-700">Requis</span>
          </label>
          <button
            type="button"
            onClick={() => handleRemoveField(field.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* ... Reste du contenu ... */}
      </div>
    </div>
  ))}

  {/* ... Bouton d'ajout ... */}
</div>