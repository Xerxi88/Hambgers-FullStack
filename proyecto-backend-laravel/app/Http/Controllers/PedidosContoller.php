<?php

namespace App\Http\Controllers;

use App\Models\Bebida;
use App\Models\Guarnicion;
use App\Models\Hamburguesa;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PedidosContoller extends Controller
{

    public function consulta()
    {
        $datos = request()->all();

        $pedidos = Pedido::consulta($datos);

        return response()->json($pedidos, 200);
    }

    public function detalle($id)
    {
        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json(['Este pedido no existe'], 400);
        }

        $pedido->hamburguesa = Hamburguesa::find($pedido->idhamburguesa)->nombre;
        $pedido->guarnicion = Guarnicion::find($pedido->idguarnicion)->nombre;
        $pedido->bebida = Bebida::find($pedido->idbebida)->nombre;
        $pedido->precioTotal = Hamburguesa::find($pedido->idhamburguesa)->precio + Guarnicion::find($pedido->idguarnicion)->precio + Bebida::find($pedido->idbebida)->precio;

        return response()->json($pedido, 200);
    }

    public function alta(Request $request)
    {
        $datos = $request->all();

        $rules = array(
            'nombre_cliente' => 'required|unique:pedidos,nombre_cliente',
            'idhamburguesa' => 'required'
        );

        $mensajes = [
            'nombre_cliente.required' => 'El nombre o apodo es obligatorio.',
            'nombre_cliente.unique' => 'Este nombre o apodo ya está asignado a otra pedido.',
            'idhamburguesa.required' => 'Se debe seleccionar una hamburguesa',
        ];


        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $pedido = Pedido::alta($datos);

        return response()->json($pedido, 200);
    }

    public function modificar($id)
    {

        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json(['Este pedido no existe'], 400);
        }

        $datos = request()->all();


        $rules = array(
            'idhamburguesa' => 'required'
        );

        $mensajes = [
            'idhamburguesa.required' => 'Se debe seleccionar una hamburguesa',
        ];

        $validator = Validator::make($datos, $rules, $mensajes);

        if ($validator->fails()) {
            $errores = $validator->getMessageBag()->all();
            return response()->json($errores, 400);
        }

        $pedido->update($datos);

        return response()->json($pedido, 200);
    }

    public function baja($id)
    {
        $pedido = Pedido::find($id);

        if (!$pedido) {
            return response()->json(['Este pedido no existe'], 400);
        }

        $pedido->delete();

        return response()->json(['Pedido eliminado'], 200);
    }
}
