PGDMP      "                |            praktika    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16416    praktika    DATABASE     |   CREATE DATABASE praktika WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE praktika;
                postgres    false            �            1259    16425    users    TABLE     )  CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    patronymic character varying(50),
    birth_date date,
    phone character varying(20),
    department character varying(50),
    position_in_rating integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16424    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    216            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          postgres    false    215            P           2604    16428    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16425    users 
   TABLE DATA           ~   COPY public.users (user_id, first_name, last_name, patronymic, birth_date, phone, department, position_in_rating) FROM stdin;
    public          postgres    false    216   p       �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 75, true);
          public          postgres    false    215            R           2606    16430    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �   a  x�U�]N�0���!��'q|ӂ��@ �?��&-�
�1�4P����~3;Z�}ᴂ��Z������:4Ai���~/h](cp��9AԦ�ԥ#��_�i�К���Utm/�����L�P� B(T�4�{Uׂ�!g�-�� LOQi��	>GZ3�k-}3&�>�Q�dnLg�ь1�1��B��V�Q�Ā�p�A�8)�Ę.����H�t�M�"�c��N!�E�p��GFN���LvWfw�/T]9e��{~3v'��`xs,��OA���l�:O�UƼ��)�J��ӫ��)�8�^s(��R1����Y5���/�h���ۘ�~&U�n,�
�L� ���ၔ��@P     