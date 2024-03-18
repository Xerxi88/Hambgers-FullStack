<?php

namespace App\Http\Controllers;

use App\Models\Bebida;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BebidaController extends Controller
{
    public function consulta()
    {
        $datos = request()->all();

        $drinks = Bebida::consulta($datos);

        return response()->json($drinks, 200);
    }

    public function alta()
    {
        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:bebidas,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta bebida ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $bebida = Bebida::create($datos);

        return response()->json($bebida, 201);
    }

    public function modificar($id)
    {

        $bebida = Bebida::find($id);

        if (!$bebida) {
            return response()->json(['Esta bebida no existe'], 400);
        }

        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:categorias,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta Bebida ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $bebida->update($datos);

        return response()->json($bebida, 200);
    }

    public function baja($id)
    {
        $bebida = Bebida::find($id);

        if (!$bebida) {
            return response()->json(['Esta bebida no existe'], 400);
        }

        $bebida->delete();

        return response()->json(['Bebida eliminada'], 200);
    }
}
