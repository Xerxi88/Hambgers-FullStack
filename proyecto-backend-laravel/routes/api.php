<?php

use App\Http\Controllers\BebidaController;
use App\Http\Controllers\GuarnicionController;
use App\Http\Controllers\HamburguesaController;
use App\Http\Controllers\PedidosContoller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/////////////////////Rutas de pedidos////////////////////////////

Route::get('/pedidos', [PedidosContoller::class, 'consulta']);

Route::get('/pedidos/{id}', [PedidosContoller::class, 'detalle']);

Route::post('/pedidos', [PedidosContoller::class, 'alta']);

Route::put('/pedidos/{pedido}', [PedidosContoller::class, 'modificar']);

Route::delete('/pedidos/{id}', [PedidosContoller::class, 'baja']);

/////////////////////Rutas de hamburguesas////////////////////////////

Route::get('/hamburguesas', [HamburguesaController::class, 'consulta']);

Route::get('/hamburguesas/{id}', [HamburguesaController::class, 'detalle']);

Route::post('/hamburguesas', [HamburguesaController::class, 'alta']);

Route::put('/hamburguesas/{hamburguesa}', [HamburguesaController::class, 'modificar']);

Route::delete('/hamburguesas/{id}', [HamburguesaController::class, 'baja']);

/////////////////////Rutas de guarniciones////////////////////////////

Route::get('/guarniciones', [GuarnicionController::class, 'consulta']);

Route::post('/guarniciones', [GuarnicionController::class, 'alta']);

Route::put('/guarniciones/{guarnicion}', [GuarnicionController::class, 'modificar']);

Route::delete('/guarniciones/{id}', [GuarnicionController::class, 'baja']);

/////////////////////Rutas de bebidas////////////////////////////

Route::get('/bebidas', [BebidaController::class, 'consulta']);

Route::post('/bebidas', [BebidaController::class, 'alta']);

Route::put('/bebidas/{bebida}', [BebidaController::class, 'modificar']);

Route::delete('/bebidas/{id}', [BebidaController::class, 'baja']);
