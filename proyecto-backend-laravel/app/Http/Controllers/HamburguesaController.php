<?php

namespace App\Http\Controllers;

use App\Models\Hamburguesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HamburguesaController extends Controller
{
    public function consulta()
    {
        $datos = request()->all();

        $burgers = Hamburguesa::consulta($datos);

        return response()->json($burgers, 200);
    }

    // Esta función la añado con la intención de escalar la web y mostrar un catalogo de hambuguesas donde se puedan ver las hamburguesas con mas detalle para consulta de los clientes

    public function detalle($id)
    {
        $burguer = Hamburguesa::find($id);

        if (!$burguer) {
            return response()->json(['Esta hamburguesa no existe'], 400);
        }

        return response()->json($burguer, 200);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    public function alta()
    {
        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:hamburguesas,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta hamburguesa ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $hamburguesa = Hamburguesa::create($datos);

        return response()->json($hamburguesa, 201);
    }

    public function modificar($id)
    {

        $hamburguesa = Hamburguesa::find($id);

        if (!$hamburguesa) {
            return response()->json(['Esta hamburguesa no existe'], 400);
        }

        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:hamburguesas,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta Hamburguesa ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $hamburguesa->update($datos);

        return response()->json($hamburguesa, 200);
    }

    public function baja($id)
    {
        $hamburguesa = Hamburguesa::find($id);

        if (!$hamburguesa) {
            return response()->json(['Esta hamburguesa no existe'], 400);
        }

        $hamburguesa->delete();

        return response()->json(['Hamburguesa eliminada'], 200);
    }
}
