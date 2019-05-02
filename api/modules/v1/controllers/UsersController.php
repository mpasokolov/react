<?php
/**
 * Created by PhpStorm.
 * User: pc
 * Date: 2019-04-21
 * Time: 16:42
 */

namespace api\modules\v1\controllers;


use common\models\User;
use sizeg\jwt\Jwt;
use sizeg\jwt\JwtHttpBearerAuth;
use yii\rest\ActiveController;

class UsersController extends ActiveController {
    public $modelClass = User::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => JwtHttpBearerAuth::class,
            'optional' => [
                'login',
            ],
        ];

        return $behaviors;
    }

    public function actionLogin() {
        $requestParams = \Yii::$app->getRequest()->getBodyParams();

        /** @var User $jwt */
        $user = User::findByUsername($requestParams['login']);

        if (!$user) {
            return $this->asJson([
                'success' => false,
                'error' => 'Пользователь не найден',
            ]);
        }

//        if ($user -> validatePassword($requestParams['password'])) {
//            return $this->asJson([
//                'success' => false,
//                'error' => 'Логин или пароль не верны',
//            ]);
//        }

        // here you can put some credentials validation logic
        // so if it success we return token
        $signer = new \Lcobucci\JWT\Signer\Hmac\Sha256();
        /** @var Jwt $jwt */
        $jwt = \Yii::$app->jwt;
        $token = $jwt -> getBuilder()
            ->setIssuer('http://react-git:7888/')// Configures the issuer (iss claim)
            ->setAudience('http://react-git:7888/')// Configures the audience (aud claim)
            ->setId('4f1g23a12aa', true)// Configures the id (jti claim), replicating as a header item
            ->setIssuedAt(time())// Configures the time that the token was issue (iat claim)
            ->setExpiration(time() + 3600)// Configures the expiration time of the token (exp claim)
            ->set('uid', $user -> getId())// Configures a new claim, called "uid"
            ->set('user', [
                'id' => $user -> getId(),
                'login' => $user -> login,
                'first_name' => $user -> first_name,
                'last_name' => $user -> last_name
            ])
            ->sign($signer, $jwt -> key)// creates a signature using [[Jwt::$key]]
            ->getToken(); // Retrieves the generated token

        return $this->asJson([
            'success' => true,
            'token' => (string)$token,
        ]);
    }

    public function actionData()
    {
        $jwt = \Yii::$app->jwt;
        return $this->asJson([
            'success' => true,
            'key' => $jwt->key
        ]);
    }

    public function actionValidateToken()
    {
        return $this->asJson([
            'success' => true,
        ]);
    }
}