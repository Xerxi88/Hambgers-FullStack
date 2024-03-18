<?php

namespace App\Http\Controllers;

use App\Models\Guarnicion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuarnicionController extends Controller
{
    public function consulta()
    {
        $datos = request()->all();

        $fries = Guarnicion::consulta($datos);

        return response()->json($fries, 200);
    }

    public function alta()
    {
        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:guarniciones,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta guarnición ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $guarnicion = Guarnicion::create($datos);

        return response()->json($guarnicion, 201);
    }

    public function modificar($id)
    {

        $guarnicion = Guarnicion::find($id);

        if (!$guarnicion) {
            return response()->json(['Esta Guarnicion no existe'], 400);
        }

        $datos = request()->all();

        $rules = array(
            'nombre' => 'required|unique:categorias,nombre',
            'precio' => 'required'
        );

        $mensajes = [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'Esta guarnición ya existe.',
            'precio.required' => 'El campo precio es obligatorio'
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $guarnicion->update($datos);

        return response()->json($guarnicion, 200);
    }

    public function baja($id)
    {
        $guarnicion = Guarnicion::find($id);

        if (!$guarnicion) {
            return response()->json(['Esta guarnicion no existe'], 400);
        }

        $guarnicion->delete();

        return response()->json(['Guarnicion eliminada'], 200);
    }
}
